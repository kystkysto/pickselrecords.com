class ChangePlayerType < ActiveRecord::Migration
  #def change
  #end
  	def up
    	change_column :releases, :player, :text
	end
	def down
	    # This might cause trouble if you have strings longer
	    # than 255 characters.
	    change_column :releases, :player, :string
	end
end
