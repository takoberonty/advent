def part2()
  # data = 'sample.dat'
  data = 'input.dat'

  file = File.open(data)
  values = file.each_line.to_a
  file.close

  ogr = filter(values, true, 0)
  csr = filter(values, false, 0)

  puts 'ogr: ' + ogr.to_i(2).to_s
  puts 'csr: ' + csr.to_i(2).to_s
  puts 'life support rating: ' + (ogr.to_i(2) * csr.to_i(2)).to_s
end

def filter(values, most, index)
  return values.first if values.length == 1

  sum = values.reduce(0) {|sum, v| sum += v[index].to_i}
  diff = sum - (values.length / 2.0)
  common = 0

  if (diff == 0)
    common = most ? 1 : 0
  elsif diff > 0
    common = most ? 1 : 0
  else
    common = most ? 0 : 1
  end

  values = values.select {|v| v[index].to_i == common }

  return filter(values, most, index+1)
end

part2()