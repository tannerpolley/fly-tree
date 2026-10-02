#!/usr/bin/env python3
"""Find openly licensed real photographs of each fly pattern (Wikimedia Commons + Openverse/Flickr).

Writes assets/real-photos/candidates.json: per pattern slug, up to 8 candidates with title, page url,
image url, size, licence, author. Licences that forbid changes (ND) are skipped, because the app crops
and resizes. Picking the best candidate per fly is a separate, visual step (see choose step in README).
Usage: scripts/find-real-photos.py [slug ...]
"""
import json, pathlib, re, sys, time, urllib.parse, urllib.request

ROOT = pathlib.Path(__file__).resolve().parent.parent
OUT = ROOT / 'assets/real-photos'
UA = 'fly-tree-photo-finder/1.0 (https://github.com/tannerpolley/fly-tree)'
# search names that photographers actually use, when they differ from the app's name
ALIASES = {
    'catskill-dry-light-cahill': ['Light Cahill'], 'callibaetis-pond-mayfly': ['Callibaetis'],
    'caddis-pupa-sparkle-pupa': ['Sparkle Pupa', 'caddis pupa'], 'egg-mop-pellet': ['egg fly', 'mop fly', 'glo bug'],
    'sex-dungeon-dungeon': ['Sex Dungeon'], 'crayfish-pattern': ['crayfish fly'], 'griffiths-gnat': ["Griffith's Gnat", 'Griffiths Gnat'],
    'pats-rubber-legs': ["Pat's Rubber Legs", 'Pats Rubber Legs'], 'kaufmanns-stone': ["Kaufmann's Stone", 'Kaufmann stonefly'],
    'hares-ear': ["Hare's Ear nymph", 'Hares Ear nymph'], 'hares-ear-soft-hackle': ["Hare's Ear soft hackle", 'hares ear wet fly'],
    'hopper': ['hopper fly', 'grasshopper fly'], 'ant': ['ant fly', 'foam ant fly'], 'beetle': ['beetle fly', 'foam beetle fly'],
    'cricket': ['cricket fly'], 'scud': ['scud fly', 'scud nymph'], 'sow-bug': ['sowbug fly', 'sow bug fly'],
    'cased-caddis': ['cased caddis fly'], 'cripple': ['cripple fly', 'Quigley cripple'], 'foam-inchworm': ['inchworm fly'],
    'partridge-and-orange': ['Partridge and Orange'], 'chubby-chernobyl': ['Chubby Chernobyl'], 'renegade': ['Renegade fly'],
    'humpy': ['Humpy fly'], 'perdigon': ['Perdigon nymph'], 'frenchie': ['Frenchie nymph'], 'brassie': ['Brassie fly', 'Brassie nymph'],
}
GENERIC = {'fly', 'flies', 'nymph', 'pattern', 'dry', 'wet', 'the', 'and', 'of'}
# names that are also ordinary words, birds or insects: these need fly-fishing words in the text too
NEEDS_FLY_WORD = {'hopper', 'ant', 'beetle', 'cricket', 'scud', 'sow-bug', 'cripple', 'humpy', 'renegade', 'egg-mop-pellet',
                  'pheasant-tail', 'stimulator', 'brassie', 'frenchie', 'matuka', 'zonker', 'muddler-minnow', 'prince-nymph', 'zug-bug'}
FLY_WORDS = re.compile(r'(fly[- ]?fish|fly[- ]?ty(ing|er)|artificial fl|trout fl|dry fl(y|ies)|wet fl(y|ies)|\bnymphs?\b|\bstreamers?\b|\btied\b|\bhook\b|fishing fl(y|ies)|\bflies\b)', re.I)
OK_LICENCE = re.compile(r'^(cc[- ]?)?(cc0|pdm|public domain|by|by-sa|by-nc|by-nc-sa)([- ][\d.]+)?$', re.I)  # no ND: the app crops and resizes

def get(url):
    req = urllib.request.Request(url, headers={'User-Agent': UA})
    for attempt in range(3):
        try:
            with urllib.request.urlopen(req, timeout=30) as r:
                return json.load(r)
        except Exception:
            time.sleep(2 + attempt * 3)
    return {}

def strip_html(s):
    return re.sub(r'<[^>]+>', '', s or '').strip()

def stem(w):
    return w[:-1] if len(w) > 3 and w.endswith('s') else w

def words(name):
    return [stem(w) for w in re.findall(r"[a-z0-9]+", name.lower().replace("’", '').replace("'", '')) if w not in GENERIC]

def matches(text, names, slug):
    t = text.lower().replace("’", '').replace("'", '')
    if slug in NEEDS_FLY_WORD and not FLY_WORDS.search(t):
        return False
    return any(all(w in t for w in words(n)) for n in names)  # stems match plurals and possessives

def commons(query):
    q = urllib.parse.urlencode({'action': 'query', 'format': 'json', 'generator': 'search', 'gsrnamespace': 6,
                                'gsrsearch': f'{query} filetype:bitmap', 'gsrlimit': 20,
                                'iiprop': 'url|size|extmetadata', 'iiurlwidth': 480, 'prop': 'imageinfo|categories', 'cllimit': 'max', 'clshow': '!hidden'})
    pages = get('https://commons.wikimedia.org/w/api.php?' + q).get('query', {}).get('pages', {})
    out = []
    for p in pages.values():
        ii = (p.get('imageinfo') or [{}])[0]
        m = ii.get('extmetadata', {})
        lic = strip_html(m.get('LicenseShortName', {}).get('value', ''))
        out.append({'source': 'commons', 'title': p['title'].removeprefix('File:'), 'page': ii.get('descriptionurl'),
                    'image': ii.get('url'), 'thumb': ii.get('thumburl'), 'w': ii.get('width'), 'h': ii.get('height'),
                    'licence': lic, 'author': strip_html(m.get('Artist', {}).get('value', ''))[:120],
                    'text': p['title'] + ' ' + strip_html(m.get('ImageDescription', {}).get('value', ''))[:400] + ' ' + ' '.join(c['title'] for c in p.get('categories', []))})
    return out

def openverse(query):
    q = urllib.parse.urlencode({'q': query, 'page_size': 20, 'mature': 'false'})
    out = []
    for r in get('https://api.openverse.org/v1/images/?' + q).get('results', []):
        lic = (r.get('license') or '') + (' ' + r['license_version'] if r.get('license_version') else '')
        out.append({'source': r.get('source'), 'title': r.get('title') or '', 'page': r.get('foreign_landing_url'),
                    'image': r.get('url'), 'thumb': r.get('thumbnail'), 'w': r.get('width'), 'h': r.get('height'),
                    'licence': lic.strip(), 'author': (r.get('creator') or '')[:120],
                    'text': (r.get('title') or '') + ' ' + ' '.join(t.get('name', '') for t in r.get('tags') or [])})
    return out

def main():
    pats = json.load(open(ROOT / 'assets/fly-photos/patterns.json'))
    only = set(sys.argv[1:])
    OUT.mkdir(parents=True, exist_ok=True)
    path = OUT / 'candidates.json'
    found = json.loads(path.read_text()) if path.exists() else {}
    for p in pats:
        slug = p['slug']
        if only and slug not in only:
            continue
        names = ALIASES.get(slug, []) + [re.sub(r'\s*\(.*\)', '', p['name'])]
        seen, cands = set(), []
        for n in names:
            for fn, q in ((commons, n + ' fly'), (openverse, n)):
                for c in fn(q):
                    key = c['image']
                    if not key or key in seen:
                        continue
                    seen.add(key)
                    if not OK_LICENCE.match(c['licence'].replace('_', ' ')) or (c['w'] or 1000) < 450 or not matches(c['text'], names, slug):
                        continue
                    cands.append(c)
                time.sleep(1.2)
        found[slug] = cands[:8]
        print(f"{slug:30s} {len(cands):2d} candidates  " + ', '.join(c['licence'] for c in cands[:4]))
        path.write_text(json.dumps(found, indent=1, ensure_ascii=False))

if __name__ == '__main__':
    main()
