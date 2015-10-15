class PicturesController < ApplicationController
    def create
       puts picture_params
       @picture = Picture.new(picture_params)  
       @picture.save
    end
    
    def destroy
        @picture = Picture.find(params[:id])  
        @picture.destroy
        redirect_to edit_gallery_path(params[:gallery_id])
    end

    private
    def picture_params
        params.require(:picture).permit(:image)
    end
end
