class Note < ActiveRecord::Base
  validates :title, :description, presence: true
end
