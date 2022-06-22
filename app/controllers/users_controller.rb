class UsersController < ApplicationController
    before_action :is_authorized?, except: [:create]


    def index 
        render json: User.all 
    end

    def show 
        user = User.find_by(id: session[:current_user])
        render json: user, serializer: UserWithTshirtSerializer
    end

    def create 
        user = User.create!(user_params)
        render json: user, status: :created
    end


    private 

   

    def user_params
        params.permit(:name, :email, :password, :password_comfirmetion)
    end


end
