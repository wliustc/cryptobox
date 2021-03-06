require 'fileutils'
require 'open3'

include CryptoboxWorld

Given /^no database$/ do
  FileUtils.rm_rf DB_DIR
  Dir.exist?(DB_DIR).should be_false
end

def create_database
  Dir.mkdir(TMP_DIR) unless Dir.exist? TMP_DIR
  Dir.chdir(TMP_DIR) do
    FileUtils.rm_rf CryptoboxWorld::DB_DIR
    File.exist?(DB_FILE).should be_false

    ret = execute('ruby ../bin/cryptobox --no-interactive create', [ "#{CORRECT_PASS}\n", "#{CORRECT_PASS}\n" ])
    ret.should == 0

    File.exist?(DB_FILE).should be_true
  end
end


Given /^empty database$/ do
  create_database
end

#Given /^default database$/ do
#  create_database
#  Dir.chdir(TMP_DIR) do
#    ret = execute('ruby ../bin/cryptobox --no-interactive edit --no-edit', [ "#{CORRECT_PASS}\n" ])
#    ret.should == 0
#  end
#end

When /^I enter correct password$/ do
  type(CORRECT_PASS)
end

When /^I enter incorrect password$/ do
  type(INCORRECT_PASS)
end

When /^I run cryptobox "([^"]*)"$/ do |cmd|
  run_interactive(unescape("ruby ../bin/cryptobox --no-interactive #{cmd}"))
end

When /^the number of backups should be (#{NUMBER})$/ do |expected_number|
  backup_dir = File.join(TMP_DIR, 'cryptobox', 'backup')

  Dir.exist?(backup_dir).should be_true if expected_number > 0

  if Dir.exist?(backup_dir)
    number = Dir.entries(backup_dir).size - 2
    number.should == expected_number
  end
end

Then /^the database can be unlocked with "(.*?)"$/ do |pwd|
  Dir.chdir(TMP_DIR) do
    ret = execute('ruby ../bin/cryptobox --no-interactive edit --no-edit --no-update', [ "#{pwd}\n" ])
    ret.should == 0
  end
end

Then /^the database can not be unlocked with "(.*?)"$/ do |pwd|
  Dir.chdir(TMP_DIR) do
    ret = execute('ruby ../bin/cryptobox --no-interactive edit --no-edit --no-update', [ "#{pwd}\n" ])
    ret.should == 2
  end
end

When /^I set database contents to:$/ do |data|
  Dir.chdir(TMP_DIR) do
    ret = execute('ruby ../bin/cryptobox --no-interactive edit --stdin --no-update', [ "#{CORRECT_PASS}\n", data ])
    ret.should == 0
  end
end

Then /^file "(.*?)" should be generated$/ do |path|
  Dir.chdir(TMP_DIR) do
    File.exist?(path).should == true
  end
end
