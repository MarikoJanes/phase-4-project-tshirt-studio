class DesignedTshirtSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :tshirt_template_id, :front_design, :back_design, :private
end
