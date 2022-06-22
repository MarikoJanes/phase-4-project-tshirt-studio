class TshirtTemplateSerializer < ActiveModel::Serializer
  attributes :id, :color, :front_url, :back_url
end
