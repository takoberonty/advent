def part1()
  # data = 'sample.dat'
  data = 'input.dat'
  file = File.open(data)
  values = []
  gamma = ''
  epsilon = ''

  values = file.each_line.to_a

  sum = []
  length = values.first.strip.length
  length.times { sum << 0 }
  values.each do |v|
    for i in 0..(length-1) do
      sum[i] += v[i].to_i
    end
  end

  majority = values.length / 2
  sum.each do |s|
    if s > majority
      gamma += '1'
      epsilon += '0'
    else
      gamma += '0'
      epsilon += '1'
    end
  end

  file.close

  puts 'power: ' + (gamma.to_i(2) * epsilon.to_i(2)).to_s
end

part1()