def puzzle()
    # data = 'sample.dat'
    data = 'input.dat'

    file = File.open(data)

    most_calories = 0
    current_elf = 0
    file.each_line do |line|
      calories = line.to_i

      if calories > 0
        current_elf += calories
        next
      else
        if current_elf > most_calories
            most_calories = current_elf
        end
        current_elf = 0
      end
    end

    puts most_calories

    file.close
  end

  puzzle()
