-dontusemixedcaseclassnames
-dontskipnonpubliclibraryclasses
-verbose

-printseeds seeds.txt
-printusage unused.txt
-printmapping mapping.txt

-renamesourcefileattribute SourceFile
-keepattributes SourceFile,LineNumberTable
-keepattributes Signature
-keepattributes *Annotation*

# Parceler
-keep class * implements android.os.Parcelable {
   public static final android.os.Parcelable$Creator *;
}

-keepclassmembers class * implements android.os.Parcelable {
    static ** CREATOR;
}

-keep interface org.parceler.Parcel
-keep @org.parceler.Parcel class * { *; }
-keep class **$$Parcelable { *; }
-keep class org.parceler.Parceler$$Parcels

# Butterknife
-dontwarn butterknife.internal.**
-keep class **$$ViewInjector { *; }
-keepnames class * { @butterknife.InjectView *;}

# Retrofit
-dontwarn rx.**
-dontwarn retrofit.**
-keep class retrofit.** { *; }
-keepclasseswithmembers class * {
    @retrofit.http.* <methods>;
}

# TwoWayView
-keep class org.lucasr.twowayview.** { *; }

# Renderscriot
-keepclasseswithmembernames class * {
    native <methods>;
}

-keep class android.support.v8.renderscript.** { *; }



#    compile 'com.android.support:support-v4:21.0.2'
#    compile 'com.android.support:support-v13:21.0.2'
#    compile 'com.android.support:appcompat-v7:21.0.2'
#    compile 'com.android.support:recyclerview-v7:21.0.2'
#    compile 'com.nispok:snackbar:2.4.0'
#    compile 'com.github.ksoichiro:android-observablescrollview:1.2.0'