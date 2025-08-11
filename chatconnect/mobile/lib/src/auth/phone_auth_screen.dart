import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';

class PhoneAuthScreen extends StatefulWidget {
  const PhoneAuthScreen({super.key});

  @override
  State<PhoneAuthScreen> createState() => _PhoneAuthScreenState();
}

class _PhoneAuthScreenState extends State<PhoneAuthScreen> {
  final _phone = TextEditingController();
  final _code = TextEditingController();
  String? _verificationId;
  String _status = '';

  Future<void> _sendCode() async {
    setState(() => _status = 'Sending code...');
    await FirebaseAuth.instance.verifyPhoneNumber(
      phoneNumber: _phone.text.trim(),
      verificationCompleted: (cred) async {
        await FirebaseAuth.instance.signInWithCredential(cred);
      },
      verificationFailed: (e) => setState(() => _status = e.message ?? 'Failed'),
      codeSent: (id, _) => setState(() { _verificationId = id; _status = 'Code sent'; }),
      codeAutoRetrievalTimeout: (_) {},
    );
  }

  Future<void> _verifyCode() async {
    final vid = _verificationId;
    if (vid == null) return;
    setState(() => _status = 'Verifying...');
    final cred = PhoneAuthProvider.credential(verificationId: vid, smsCode: _code.text.trim());
    await FirebaseAuth.instance.signInWithCredential(cred);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Verify Phone')),
      body: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          children: [
            TextField(controller: _phone, decoration: const InputDecoration(labelText: 'Phone Number')), 
            const SizedBox(height: 8),
            ElevatedButton(onPressed: _sendCode, child: const Text('Send Code')),
            const SizedBox(height: 16),
            if (_verificationId != null) ...[
              TextField(controller: _code, decoration: const InputDecoration(labelText: 'OTP Code')),
              const SizedBox(height: 8),
              ElevatedButton(onPressed: _verifyCode, child: const Text('Verify')),
            ],
            const SizedBox(height: 16),
            Text(_status),
          ],
        ),
      ),
    );
  }
}