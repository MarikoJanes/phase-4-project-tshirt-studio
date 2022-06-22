class TshirtTemplate < ApplicationRecord

    has_many :designed_tshirts
    has_many :users, through: :designed_tshirts
    
end
