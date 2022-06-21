class CreateTshirtTemplates < ActiveRecord::Migration[6.1]
  def change
    create_table :tshirt_templates do |t|
      t.string :color
      t.string :front_url
      t.string :back_url

      t.timestamps
    end
  end
end
