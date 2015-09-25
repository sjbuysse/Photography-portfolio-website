class GalleryController < ApplicationController
    def index
        @pictures = Picture.all
    end
end
