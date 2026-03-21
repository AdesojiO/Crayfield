from pydantic import BaseModel, ConfigDict


class VariantOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id:       int
    label:    str
    price:    int
    sku:      str | None = None
    in_stock: bool


class ProductOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id:          int
    name:        str
    slug:        str
    category:    str
    description: str | None = None
    how_to_use:  str | None = None
    storage:     str | None = None
    allergens:   str | None = None
    image_url:   str | None = None
    image_back_url: str | None = None
    featured:    bool
    in_stock:    bool
    price:       int
    variants:    list[VariantOut] = []


class ProductListOut(BaseModel):
    items: list[ProductOut]
    total: int


class ProductCreate(BaseModel):
    name:        str
    slug:        str
    category:    str
    description: str | None = None
    how_to_use:  str | None = None
    storage:     str | None = None
    allergens:   str | None = None
    image_url:   str | None = None
    image_back_url: str | None = None
    featured:    bool = False
    in_stock:    bool = True
    price:       int


class VariantCreate(BaseModel):
    label:      str
    price:      int
    sku:        str | None = None
    in_stock:   bool = True
    sort_order: int  = 0
