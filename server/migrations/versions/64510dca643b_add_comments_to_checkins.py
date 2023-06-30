"""add comments to checkins

Revision ID: 64510dca643b
Revises: 21cacb1be225
Create Date: 2023-06-30 12:56:08.902337

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '64510dca643b'
down_revision = '21cacb1be225'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('checkins', schema=None) as batch_op:
        batch_op.add_column(sa.Column('comment', sa.Integer(), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('checkins', schema=None) as batch_op:
        batch_op.drop_column('comment')

    # ### end Alembic commands ###