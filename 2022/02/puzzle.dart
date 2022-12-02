import 'dart:io';
import 'dart:convert';
import 'dart:async';

void main() async {
  // final data = 'sample.dat';
  final data = 'input.dat';

  final file = File(data);
  Stream<String> lines = file
      .openRead()
      .transform(utf8.decoder) // Decode bytes to UTF-8.
      .transform(LineSplitter()); // Convert stream to individual lines.

  new Puzzle().solve(lines);
}

class Puzzle {
  Puzzle();

  final List<List<String>> _data = [];

  void solve(Stream<String> lines) async {
    try {
      await for (var line in lines) {
        _data.add(line.split(' '));
      }

      var score1 = 0;
      var score2 = 0;

      _data.forEach((element) {
        score1 += this.score(this.convert(element));
        score2 += this.score(this.convert2(element));
      });

      print(score1);
      print(score2);
    } catch (e) {
      print('Error: $e');
    }
  }

  List<int> convert(List<String> data) {
    return data.map((i) {
      switch (i) {
        case 'A':
        case 'X':
          return 1;
        case 'B':
        case 'Y':
          return 2;
        case 'C':
        case 'Z':
          return 3;
        default:
          return 0;
      }
    }).toList();
  }

  List<int> convert2(List<String> data) {
    final d0 = data[0] == 'A'
        ? 1
        : data[0] == 'B'
            ? 2
            : 3;

    var d1 = data[1] == 'X'
        ? (d0 - 1) % 3
        : data[1] == 'Y'
            ? d0
            : (d0 + 1) % 3;

    if (d1 == 0) {
      d1 = 3;
    }

    return [d0, d1];
  }

  // 1 for Rock, 2 for Paper, and 3 for Scissors
  //0 if you lost, 3 if the round was a draw, and 6 if you won
  int score(List<int> data) {
    if (data.length < 2) {
      return 0;
    }

    final result = data[1] - data[0];
    if (result == 1 || result == -2) {
      return 6 + data[1];
    } else if (result == 0) {
      return 3 + data[1];
    } else {
      return data[1];
    }
  }
}
