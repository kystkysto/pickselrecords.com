class CreateReleases < ActiveRecord::Migration
  def change
    create_table :releases do |t|
      t.string :cover, null: false
      t.string :logo, null: false
      t.string :title, null: false
      t.string :txt, null: false
      t.boolean :current, :default => false
      t.string :player, null: false
      t.datetime :release

      t.timestamps null: false
    end
  end
end
