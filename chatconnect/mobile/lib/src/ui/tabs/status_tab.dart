import 'package:flutter/material.dart';
import '../widgets/avatar.dart';
import '../widgets/section_title.dart';

class StatusTab extends StatelessWidget {
  const StatusTab({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Status')),
      body: ListView(
        children: [
          Padding(
            padding: const EdgeInsets.all(16),
            child: Container(
              decoration: BoxDecoration(
                gradient: LinearGradient(colors: [
                  Theme.of(context).colorScheme.primaryContainer,
                  Theme.of(context).colorScheme.secondaryContainer,
                ]),
                borderRadius: BorderRadius.circular(16),
              ),
              padding: const EdgeInsets.all(16),
              child: Row(
                children: const [
                  GradientAvatar(size: 56, highlight: true, placeholderIcon: Icons.add_a_photo_outlined),
                  SizedBox(width: 12),
                  Expanded(child: Text('My Status\nTap to add update', maxLines: 2)),
                ],
              ),
            ),
          ),
          const SectionTitle('Recent updates'),
          SizedBox(
            height: 96,
            child: ListView.separated(
              padding: const EdgeInsets.symmetric(horizontal: 16),
              scrollDirection: Axis.horizontal,
              itemCount: 12,
              separatorBuilder: (_, __) => const SizedBox(width: 16),
              itemBuilder: (context, i) => Column(
                children: const [
                  GradientAvatar(highlight: true),
                  SizedBox(height: 8),
                  Text('Alex', style: TextStyle(fontWeight: FontWeight.w600)),
                ],
              ),
            ),
          ),
          const SectionTitle('Viewed updates'),
          ListView.separated(
            shrinkWrap: true,
            physics: const NeverScrollableScrollPhysics(),
            itemCount: 6,
            separatorBuilder: (_, __) => const Divider(indent: 80, height: 1),
            itemBuilder: (context, i) => const ListTile(
              leading: GradientAvatar(),
              title: Text('Taylor'),
              subtitle: Text('Today, 10:30 AM'),
            ),
          ),
          const SizedBox(height: 80),
        ],
      ),
      floatingActionButton: FloatingActionButton.extended(
        onPressed: () {},
        icon: const Icon(Icons.add_circle_outline),
        label: const Text('Add Status'),
      ),
    );
  }
}