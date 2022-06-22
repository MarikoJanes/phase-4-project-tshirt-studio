# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2022_06_21_220126) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "designed_tshirts", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "tshirt_template_id", null: false
    t.string "front_design"
    t.string "back_design"
    t.boolean "private"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["tshirt_template_id"], name: "index_designed_tshirts_on_tshirt_template_id"
    t.index ["user_id"], name: "index_designed_tshirts_on_user_id"
  end

  create_table "tshirt_templates", force: :cascade do |t|
    t.string "color"
    t.string "front_url"
    t.string "back_url"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "name"
    t.string "email"
    t.string "password_digest"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  add_foreign_key "designed_tshirts", "tshirt_templates"
  add_foreign_key "designed_tshirts", "users"
end
