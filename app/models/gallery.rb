class Gallery < ActiveRecord::Base
    has_many :pictures, dependent: :destroy
    accepts_nested_attributes_for :pictures, reject_if: proc { |attributes| attributes[:image].blank? && picture.new_record? }, allow_destroy: true;

    mount_uploader :thumb, ThumbUploader

    scope :descending, -> {order('created_at DESC')}

    validates :title, presence: true, length: {minimum: 3}
    validates :synopsis, presence: true, length: {minimum: 3}
end
