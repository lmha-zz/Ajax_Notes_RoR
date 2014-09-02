class NotesController < ApplicationController
  before_action :set_note, only: [:update, :destroy]
  
  def index
    @notes = Note.all
    @note = Note.new
  end

  def create
    @note = Note.new(note_params)
    respond_to do |format|
      if @note.save
        format.js
      else
        flash[:errors] = @note.errors.full_messages
        format.js { render template: 'notes/errors', status: :unprocessable_entity }
      end
    end
  end

  def update
      if @note.update(note_params)
        head :ok
      else
        respond_to do |format|
          flash[:errors] = @note.errors.full_messages
          format.js { render template: 'notes/errors', status: :unprocessable_entity }
        end
      end
  end

  def destroy
    @note.destroy
    head :ok
  end

  private
  def set_note
    @note = Note.find(params[:id])
  end
  def note_params
    params.require(:note).permit(:title, :description)
  end
end
