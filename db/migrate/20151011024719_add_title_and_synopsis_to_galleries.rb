class AddTitleAndSynopsisToGalleries < ActiveRecord::Migration
  def change
    add_column :galleries, :title, :string
    add_column :galleries, :synopsis, :text
  end
end
