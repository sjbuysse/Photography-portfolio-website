class PicturesController < ApplicationController
    def create
       @picture = Picture.new(picture_params)  
       @picture.save
    end
    def update
       @picture = Picture.find(params[:id])  
       @picture.update(picture_params)
    end
    def destroy
        @picture = Picture.find(params[:id])  
        @picture.destroy
        respond_to do |format|
            format.html {redirect_to edit_gallery_path(params[:gallery_id])}
            format.js {render nothing: true}
        end
    end

    private
    def picture_params
        params.require(:picture).permit(:image, :title)
    end
end
