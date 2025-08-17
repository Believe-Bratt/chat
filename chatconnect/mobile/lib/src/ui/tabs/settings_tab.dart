import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';

class SettingsTab extends StatelessWidget {
  const SettingsTab({super.key});

  @override
  Widget build(BuildContext context) {
    final user = FirebaseAuth.instance.currentUser;
    final cs = Theme.of(context).colorScheme;
    return Scaffold(
      appBar: AppBar(title: const Text('Settings')),
      body: ListView(
        children: [
          Padding(
            padding: const EdgeInsets.all(16),
            child: Container(
              decoration: BoxDecoration(
                gradient: LinearGradient(colors: [cs.primaryContainer, cs.secondaryContainer]),
                borderRadius: BorderRadius.circular(16),
              ),
              padding: const EdgeInsets.all(16),
              child: Row(
                children: [
                  CircleAvatar(radius: 28, child: Text((user?.displayName ?? 'U')[0])),
                  const SizedBox(width: 12),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(user?.displayName ?? 'Your Name', style: const TextStyle(fontWeight: FontWeight.w700, fontSize: 18)),
                        Text(user?.phoneNumber ?? '', style: TextStyle(color: cs.onSurfaceVariant)),
                      ],
                    ),
                  ),
                  IconButton(onPressed: () {}, icon: const Icon(Icons.edit_outlined)),
                ],
              ),
            ),
          ),
          const _SectionHeader('Account'),
          const _Tile(Icon(Icons.lock_outline), 'Privacy'),
          const _Tile(Icon(Icons.shield_outlined), 'Security'),
          const _Tile(Icon(Icons.palette_outlined), 'Appearance'),
          const Divider(),
          const _SectionHeader('Notifications'),
          SwitchListTile(
            secondary: const Icon(Icons.check_circle_outline),
            title: const Text('Read receipts'),
            value: true,
            onChanged: (v) {},
          ),
          const Divider(),
          ListTile(
            leading: const Icon(Icons.logout),
            title: const Text('Sign out'),
            onTap: () => FirebaseAuth.instance.signOut(),
          ),
          const SizedBox(height: 24),
        ],
      ),
    );
  }
}

class _SectionHeader extends StatelessWidget {
  final String title;
  const _SectionHeader(this.title);
  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.fromLTRB(16, 16, 16, 8),
      child: Text(title, style: Theme.of(context).textTheme.titleSmall?.copyWith(fontWeight: FontWeight.w700)),
    );
  }
}

class _Tile extends StatelessWidget {
  final Widget icon;
  final String title;
  const _Tile(this.icon, this.title);
  @override
  Widget build(BuildContext context) {
    return ListTile(leading: icon, title: Text(title), trailing: const Icon(Icons.chevron_right));
  }
}