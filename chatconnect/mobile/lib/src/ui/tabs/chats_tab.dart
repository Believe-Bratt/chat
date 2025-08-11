import 'package:animations/animations.dart';
import 'package:flutter/material.dart';
import '../widgets/chat_list_item.dart';

class ChatsTab extends StatefulWidget {
  const ChatsTab({super.key});

  @override
  State<ChatsTab> createState() => _ChatsTabState();
}

class _ChatsTabState extends State<ChatsTab> {
  final TextEditingController _searchCtrl = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Chats'),
        actions: [
          IconButton(onPressed: () {}, icon: const Icon(Icons.more_vert)),
        ],
      ),
      body: CustomScrollView(
        slivers: [
          SliverToBoxAdapter(
            child: Padding(
              padding: const EdgeInsets.fromLTRB(16, 12, 16, 8),
              child: TextField(
                controller: _searchCtrl,
                decoration: const InputDecoration(
                  hintText: 'Search chats',
                  prefixIcon: Icon(Icons.search),
                ),
              ),
            ),
          ),
          SliverList.separated(
            itemCount: 12,
            separatorBuilder: (_, __) => const Divider(height: 1, indent: 80),
            itemBuilder: (context, index) {
              return ChatListItem(
                title: index % 3 == 0 ? 'Design Team' : 'Alex Doe',
                subtitle: index % 2 == 0 ? 'You: Let’s meet at 3pm.' : 'Typing…',
                time: index == 0 ? 'Now' : '12:${(10 + index) % 60}'.padLeft(2, '0'),
                unread: index % 4 == 0 ? 3 : 0,
                onTap: () {},
              );
            },
          ),
          const SliverToBoxAdapter(child: SizedBox(height: 80)),
        ],
      ),
      floatingActionButton: OpenContainer(
        closedColor: Theme.of(context).colorScheme.primary,
        closedShape: const StadiumBorder(),
        closedElevation: 6,
        transitionType: ContainerTransitionType.fadeThrough,
        openBuilder: (context, _) => const _NewChatSheet(),
        closedBuilder: (context, open) => FloatingActionButton.extended(
          onPressed: open,
          icon: const Icon(Icons.chat),
          label: const Text('New'),
        ),
      ),
      floatingActionButtonLocation: FloatingActionButtonLocation.endFloat,
    );
  }
}

class _NewChatSheet extends StatelessWidget {
  const _NewChatSheet();
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('New')), 
      body: ListView(
        children: const [
          ListTile(leading: Icon(Icons.group_add_outlined), title: Text('New Group')),
          ListTile(leading: Icon(Icons.person_add_alt_1_outlined), title: Text('New Contact')),
          ListTile(leading: Icon(Icons.lock_outline), title: Text('New Secret Chat')),
        ],
      ),
    );
  }
}