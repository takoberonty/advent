def part1()
  # data = 'sample.dat'
  data = 'input.dat'

  file = File.open(data)

  previous_value = 0
  previous_count = 0
  first = true
  file.each_line do |line|
    current_value = line.to_i

    if first
      first = false
      previous_value = current_value
      next
    end

    if current_value > previous_value
      previous_count += 1
    end

    previous_value = current_value
    puts previous_count
  end

  file.close
end

part1()
