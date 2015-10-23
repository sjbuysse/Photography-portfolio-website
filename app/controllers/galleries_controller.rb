class GalleriesController < ApplicationController
    before_action :authenticate_user!, except: [:index, :show]
    before_action :find_gallery, only: [:show, :edit, :update, :destroy]
    def index
        @galleries = Gallery.all
    end
    def new
        @gallery = Gallery.new
        @gallery.pictures.build
    end
    def create
        @gallery = Gallery.new gallery_params
        @gallery.save
        redirect_to(gallery_path(@gallery))
    end
    def show
    end
    def edit
        @gallery.pictures.build
    end
    def update
        @gallery.update(gallery_params)
        redirect_to(gallery_path(@gallery))
    end
    def destroy
        @gallery.destroy
        redirect_to galleries_path
    end

    private
    def find_gallery
        @gallery = Gallery.find(params[:id])
    end
    def gallery_params
        params.require(:gallery).permit(:title, :synopsis, :thumb, pictures_attributes: [:image, :title, :id, :_destroy])
    end
end
