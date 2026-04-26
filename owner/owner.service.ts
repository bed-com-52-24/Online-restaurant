import { Injectable, NotFoundException } from '@nestjs/common';

// Move interface outside the class
export interface MenuItem {
  id: number;
  name: string;
  price: number;
  description?: string;
}

@Injectable()
export class MenuService {
  private menu: MenuItem[] = [];
  private nextId = 1; // safer ID counter

  // GET all menu items
  getMenu(): MenuItem[] {
    return this.menu;
  }

  // GET single menu item
  getMenuItem(id: number): MenuItem {
    const item = this.menu.find(m => m.id === id);
    if (!item) {
      throw new NotFoundException('Menu item not found');
    }
    return item;
  }

  // POST (create new menu item)
  createMenuItem(item: Omit<MenuItem, 'id'>): MenuItem {
    const newItem: MenuItem = { id: this.nextId++, ...item };
    this.menu.push(newItem);
    return newItem;
  }

  // DELETE — removes an item
  deleteMenuItem(id: number): { message: string } {
    const index = this.menu.findIndex(m => m.id === id);
    if (index === -1) {
      throw new NotFoundException('Menu item not found');
    }
    this.menu.splice(index, 1);
    return { message: 'Menu item deleted successfully' };
  }

  // PATCH (partial update)
  patchMenuItem(id: number, updates: Partial<MenuItem>): MenuItem {
    const item = this.getMenuItem(id);
    const updatedItem = { ...item, ...updates };
    const index = this.menu.findIndex(m => m.id === id);
    this.menu[index] = updatedItem;
    return updatedItem;
  }
}

@Injectable()
export class OwnerService {

}