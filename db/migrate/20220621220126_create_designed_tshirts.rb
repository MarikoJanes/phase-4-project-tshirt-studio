class CreateDesignedTshirts < ActiveRecord::Migration[6.1]
  def change
    create_table :designed_tshirts do |t|
      t.belongs_to :user, null: false, foreign_key: true
      t.belongs_to :tshirt_template, null: false, foreign_key: true
      t.string :front_design
      t.string :back_design
      t.boolean :private

      t.timestamps
    end
  end
end
