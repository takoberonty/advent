def puzzle()
    # data = 'sample.dat'
    data = 'input.dat'

    file = File.open(data)

    elves = []
    current_elf = 0
    file.each_line do |line|
      calories = line.to_i

      if calories > 0
        current_elf += calories
        next
      else
        elves << current_elf
        current_elf = 0
      end
    end
    elves << current_elf

    elves.sort! { |a,b| b <=> a }
    # puts elves
    puts elves[0..2].reduce(:+)

    file.close
  end

  puzzle()