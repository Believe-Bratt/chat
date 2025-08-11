import 'package:flutter/material.dart';

class CallsTab extends StatefulWidget {
  const CallsTab({super.key});

  @override
  State<CallsTab> createState() => _CallsTabState();
}

class _CallsTabState extends State<CallsTab> {
  int filter = 0; // 0 all, 1 missed

  @override
  Widget build(BuildContext context) {
    final cs = Theme.of(context).colorScheme;
    return Scaffold(
      appBar: AppBar(title: const Text('Calls')),
      body: Column(
        children: [
          Padding(
            padding: const EdgeInsets.fromLTRB(16, 12, 16, 8),
            child: SegmentedButton<int>(
              segments: const [
                ButtonSegment(value: 0, label: Text('All')),
                ButtonSegment(value: 1, label: Text('Missed')),
              ],
              selected: {filter},
              style: ButtonStyle(visualDensity: VisualDensity.compact),
              onSelectionChanged: (s) => setState(() => filter = s.first),
            ),
          ),
          Expanded(
            child: ListView.separated(
              itemCount: 10,
              separatorBuilder: (_, __) => const Divider(indent: 80, height: 1),
              itemBuilder: (context, i) {
                final missed = i % 3 == 0;
                final icon = i % 2 == 0 ? Icons.call_outgoing : Icons.call_received;
                return ListTile(
                  leading: CircleAvatar(
                    backgroundColor: cs.primaryContainer,
                    child: Icon(Icons.person, color: cs.onPrimaryContainer),
                  ),
                  title: Row(children: [
                    const Text('Chris Pratt'),
                    const SizedBox(width: 8),
                    if (missed) Chip(label: const Text('Missed'), visualDensity: VisualDensity.compact),
                  ]),
                  subtitle: Text(i % 2 == 0 ? 'Yesterday, 7:12 PM' : 'Today, 11:04 AM'),
                  trailing: Icon(icon, color: missed ? Colors.red : cs.primary),
                );
              },
            ),
          ),
        ],
      ),
      floatingActionButton: FloatingActionButton.extended(
        onPressed: () {},
        icon: const Icon(Icons.add_ic_call_outlined),
        label: const Text('New Call'),
      ),
    );
  }
}