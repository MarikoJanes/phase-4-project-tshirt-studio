class DesignedTshirt < ApplicationRecord
  belongs_to :user
  belongs_to :tshirt_template
end
