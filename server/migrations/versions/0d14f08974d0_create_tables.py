"""Create tables

Revision ID: 0d14f08974d0
Revises: 
Create Date: 2023-06-27 13:59:56.839200

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '0d14f08974d0'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('playgrounds',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=True),
    sa.Column('rank', sa.Integer(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('checkins',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('rating', sa.Integer(), nullable=True),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('playground_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['playground_id'], ['playgrounds.id'], name=op.f('fk_checkins_playground_id_playgrounds')),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], name=op.f('fk_checkins_user_id_users')),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('checkins')
    op.drop_table('users')
    op.drop_table('playgrounds')
    # ### end Alembic commands ###
