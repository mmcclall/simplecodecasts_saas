class ContactsController < ApplicationController
  def new
    @contact = Contact.new
  end
  
  def create
    @contact = Contact.new(contact_params)
    
    if @contact.save
      # variables for mailer
      name = params[:contact][:name]
      email = params[:contact][:email]
      body = params[:contact][:comments]
      
      # send contact to your email via contant_mailer
      ContactMailer.contact_email(name, email, body).deliver
      
      # message for user
      flash[:success] = "Message sent."
      redirect_to new_contact_path
    else
      flash[:danger] = "Error occurred, message has not been sent."
      redirect_to new_contact_path
    end
  end
  
  private
    def contact_params
      params.require(:contact).permit(:name, :email, :comments)
    end
end