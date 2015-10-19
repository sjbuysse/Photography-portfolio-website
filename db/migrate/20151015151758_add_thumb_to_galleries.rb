class AddThumbToGalleries < ActiveRecord::Migration
  def change
    add_column :galleries, :thumb, :string
  end
end
