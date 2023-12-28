class UsersController < ApplicationController
  before_action :set_user, only: [:edit, :update]

  def edit
    respond_to do |format|
      format.html { render partial: 'form_modal', locals: { user: @user } }
    end
  end

  def update
    respond_to do |format|
      if @user.update(user_params)
        format.html { redirect_back fallback_location: root_path, notice: 'Sus datos se actualizaron correctamente.' }
      else
        format.html { render partial: 'form', locals: { user: @user }, status: :unprocessable_entity }
      end
    end
  end

  private

    def set_user
      @user = User.find(params[:id])
    end

    def user_params
      fields = params.require(:user).permit(:full_name, :email, :password, :password_confirmation)
      if fields[:password].blank?
        fields.delete(:password)
        fields.delete(:password_confirmation)
      end

      fields
    end
end