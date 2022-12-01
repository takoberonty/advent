def part2()
  # data = 'sample.dat'
  data = 'input.dat'

  file = File.open(data)
  values = []
  composite_values = []

  file.each_line do |line|
    values << line.to_i
  end

  values.each_with_index do |n, index|
    if index < values.length - 2
      composite_values << values[index] + values[index+1] + values[index+2]
    end
  end

  previous_value = 0
  previous_count = 0
  first = true

  composite_values.each do |current_value|
    puts current_value
  end

  composite_values.each do |current_value|
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

part2()
