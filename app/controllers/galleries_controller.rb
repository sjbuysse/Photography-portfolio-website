class GalleriesController < ApplicationController
    before_action :authenticate_user!, except: [:index, :show]
    before_action :find_gallery, only: [:show, :edit, :update, :destroy]
    def index
        @galleries = Gallery.all
    end
    def new
        @gallery = Gallery.new
    end
    def create
        @gallery = Gallery.new(gallery_params)
        if @gallery.save
            if params[:images]
                params[:images].each do |image|
                    @gallery.pictures.create(image: image)
                end
            end
            flash[:success] = "Successfully created gallery"
            redirect_to(gallery_path(@gallery))
        else
            flash[:error] = "Could not save gallery"
            render action: :new
            flash.discard(:error)
        end
    end
    def show
    end
    def edit
    end
    def update
        if @gallery.update(gallery_params)
            if params[:images]
                params[:images].each do |image|
                    @gallery.pictures.create(image: image)
                end
            end
            flash[:success] = "Successfully updated gallery"
            redirect_to(gallery_path(@gallery))
            else
            flash[:error] = "Could not save gallery"
            render action: :edit
            flash.discard(:error)
        end
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
        params.require(:gallery).permit(:title, :synopsis, :thumb)
    end
end
