class UserWithTshirtSerializer < ActiveModel::Serializer
  attributes :id, :name, :email, :password_digest
  has_many :designed_tshirts
end
