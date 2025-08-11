import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

final ColorScheme appColorScheme = ColorScheme.fromSeed(
  brightness: Brightness.light,
  seedColor: const Color(0xFF6C5CE7),
  dynamicSchemeVariant: DynamicSchemeVariant.fidelity,
);

ThemeData buildLightTheme() {
  final base = ThemeData(
    useMaterial3: true,
    colorScheme: appColorScheme,
    textTheme: GoogleFonts.interTextTheme(),
  );
  return base.copyWith(
    appBarTheme: AppBarTheme(
      backgroundColor: base.colorScheme.surface,
      foregroundColor: base.colorScheme.onSurface,
      elevation: 0,
      centerTitle: false,
      titleTextStyle: GoogleFonts.inter(
        fontSize: 20,
        fontWeight: FontWeight.w700,
        color: base.colorScheme.onSurface,
      ),
    ),
    floatingActionButtonTheme: FloatingActionButtonThemeData(
      backgroundColor: base.colorScheme.primary,
      foregroundColor: base.colorScheme.onPrimary,
      shape: const StadiumBorder(),
    ),
    navigationBarTheme: NavigationBarThemeData(
      indicatorColor: base.colorScheme.primaryContainer,
      labelTextStyle: WidgetStatePropertyAll(GoogleFonts.inter(fontWeight: FontWeight.w600)),
    ),
    inputDecorationTheme: InputDecorationTheme(
      filled: true,
      fillColor: base.colorScheme.surfaceContainerHighest,
      border: OutlineInputBorder(
        borderRadius: BorderRadius.circular(14),
        borderSide: BorderSide.none,
      ),
    ),
    chipTheme: base.chipTheme.copyWith(
      shape: StadiumBorder(side: BorderSide.none),
    ),
  );
}

ThemeData buildDarkTheme() {
  final light = buildLightTheme();
  return light.copyWith(
    colorScheme: appColorScheme.copyWith(brightness: Brightness.dark),
    textTheme: GoogleFonts.interTextTheme(ThemeData.dark().textTheme),
  );
}