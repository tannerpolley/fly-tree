plugins {
    id("com.android.application")
}

android {
    namespace = "com.tannerpolley.flytree"
    compileSdk = 37
    defaultConfig {
        applicationId = "com.tannerpolley.flytree"
        minSdk = 26
        targetSdk = 36
        versionCode = 7
        versionName = "1.5"
    }
}

dependencies {
    implementation("androidx.webkit:webkit:1.17.1")
}
