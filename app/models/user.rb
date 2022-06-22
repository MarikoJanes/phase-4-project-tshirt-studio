class User < ApplicationRecord
    has_secure_password

    has_many :designed_tshirts
    has_many :tshirt_templates, through: :designed_tshirts

    validates :name, presence: true, uniqueness: true
    validates :email, format: /\w+@\w+\.{1}[a-zA-Z]{2,}/, presence: true, uniqueness: true
    
end
