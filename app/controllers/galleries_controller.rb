class GalleriesController < ApplicationController
    def index
        @galleries = Gallery.all
    end
    def new
        @gallery = Gallery.new
    end
    def create
        @gallery = Gallery.new(gallery_params)
        if @gallery.save
            flash[:success] = "Successfully created gallery"
            redirect_to(gallery_path(@gallery))
        else
            flash[:error] = "Could not save gallery"
            render action: :new
            flash.discard(:error)
        end
    end
    
    def show
        @gallery = Gallery.find(params[:id])
    end

    private
    def gallery_params
        params.require(:gallery).permit(:title, :synopsis)
    end
end
