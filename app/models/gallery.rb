class Gallery < ActiveRecord::Base
    has_many :pictures, dependent: :destroy

    validates :title, presence: true, length: {minimum: 3}
    validates :synopsis, presence: true, length: {minimum: 3}
end
