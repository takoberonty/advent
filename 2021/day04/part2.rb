def part2()
  # data = 'sample.dat'
  data = 'input.dat'

  numbers = []
  cards = [] # [card [row [column]]]

  # Build Data
  file = File.open(data)
  card_index = 0
  row_index = 0
  file.each_with_index do |line, i|
    if i == 0
      numbers = line.split(',').map {|n| n.to_i}
      next
    end

    if line.strip.length == 0
      card_index += 1 if cards.length > 0
      row_index = 0
      next
    end

    card = cards[card_index] || []
    row = card[row_index] || []
    line.split.each_with_index do |number, column|
      row << { number: number.to_i, marker: false}
    end
    card[row_index] = row
    cards[card_index] = card

    row_index += 1
  end
  file.close

  card_track = []
  for i in 1..cards.length
    card_track << false
  end
  numbers.each do |number|
    # Mark
    cards.each_with_index do |card, index|
      next if card_track[index]

      card.each do |row|
        row.each do |column|
          if column[:number] == number
            column[:marker] = true
            score = bingo?(card, number)
            if score > 0
              # puts "Bingo on card #{index}"
              card_track[index] = true
              if (card_track.all? {|c| c == true})
                puts "Worst Score: #{score}"
                return
              end

              break
            end
          end
        end
        break if card_track[index]
      end
    end
  end
end

def bingo?(card, number)
  row_bingo = false
  col_bingo = false
  card.each do |row|
    row_bingo = true
    row.each do |col|
      if !col[:marker]
        row_bingo = false
        break
      end
    end
    break if row_bingo
  end
  for i in 0..(card.first.length-1)
    col_bingo = true
    card.each do |row|
      if !row[i][:marker]
        col_bingo = false
        break
      end
    end
    break if col_bingo
  end

  if row_bingo || col_bingo
    # puts "bingo! #{number}"
    score = 0

    card.each do |row|
      row.each do |col|
        score += col[:number] unless col[:marker]
      end
    end
    score *= number

    # puts "score: #{score}"
    return score
  end

  return 0
end

part2()