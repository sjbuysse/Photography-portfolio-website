class ContactsController < ApplicationController
    def new
        @contact = Contact.new
    end
    def create
        @contact = Contact.new(params[:contact])
        @contact.request = request
        if @contact.deliver
            flash[:notice] = "Thank you for your message, I'll get back to you as asap!"
            redirect_to(new_contact_path) 
        else
            flash.now[:error] = "Cannot send message."
            render :new
        end
    end
end
