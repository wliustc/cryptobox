module Cryptobox
  module Command
    def self.create(config, interactive)
      if File.exist? config[:path][:cryptobox]
        return unless Cryptobox::yn "Database already exists, do you want to overwrite it?"
      end

      db = Cryptobox::Db.new config[:path][:cryptobox],
        config[:path][:backup],
        config[:cryptobox][:keep_backups],
        Cryptobox::ask_password('Password:', interactive)

      db.create Cryptobox::ask_password('Confirm password:', interactive)

      db.plaintext = '# Lines started with # are comments'
      db.save
    end
  end
end
