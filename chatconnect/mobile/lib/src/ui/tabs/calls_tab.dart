import 'package:flutter/material.dart';

class CallsTab extends StatelessWidget {
  const CallsTab({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Calls')),
      body: const Center(child: Text('Call logs will appear here')),
    );
  }
}