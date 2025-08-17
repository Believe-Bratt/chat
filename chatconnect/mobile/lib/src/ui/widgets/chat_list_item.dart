import 'package:flutter/material.dart';
import 'avatar.dart';

class ChatListItem extends StatelessWidget {
  final String title;
  final String subtitle;
  final String time;
  final int unread;
  final String? avatarUrl;
  final VoidCallback? onTap;
  const ChatListItem({
    super.key,
    required this.title,
    required this.subtitle,
    required this.time,
    this.unread = 0,
    this.avatarUrl,
    this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return ListTile(
      contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 4),
      leading: GradientAvatar(imageUrl: avatarUrl, highlight: unread > 0),
      title: Text(title, style: const TextStyle(fontWeight: FontWeight.w700)),
      subtitle: Text(subtitle, maxLines: 1, overflow: TextOverflow.ellipsis),
      trailing: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Text(time, style: Theme.of(context).textTheme.labelSmall),
          const SizedBox(height: 6),
          if (unread > 0)
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
              decoration: BoxDecoration(
                color: Theme.of(context).colorScheme.primary,
                borderRadius: BorderRadius.circular(12),
              ),
              child: Text('$unread', style: TextStyle(color: Theme.of(context).colorScheme.onPrimary, fontSize: 11)),
            ),
        ],
      ),
      onTap: onTap,
    );
  }
}