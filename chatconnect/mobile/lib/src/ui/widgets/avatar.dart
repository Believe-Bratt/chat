import 'package:flutter/material.dart';

class GradientAvatar extends StatelessWidget {
  final String? imageUrl;
  final double size;
  final bool highlight;
  final IconData placeholderIcon;

  const GradientAvatar({
    super.key,
    this.imageUrl,
    this.size = 48,
    this.highlight = false,
    this.placeholderIcon = Icons.person,
  });

  @override
  Widget build(BuildContext context) {
    final ring = Container(
      width: size,
      height: size,
      decoration: BoxDecoration(
        shape: BoxShape.circle,
        gradient: highlight
            ? const LinearGradient(colors: [Color(0xFFFF6CAB), Color(0xFFFFD56F)])
            : null,
      ),
      padding: const EdgeInsets.all(2),
      child: CircleAvatar(
        radius: size / 2,
        backgroundImage: imageUrl != null && imageUrl!.isNotEmpty ? NetworkImage(imageUrl!) : null,
        child: imageUrl == null || imageUrl!.isEmpty ? Icon(placeholderIcon, size: size * 0.5) : null,
      ),
    );
    return ring;
  }
}