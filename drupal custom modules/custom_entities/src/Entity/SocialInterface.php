<?php

namespace Drupal\custom_entities\Entity;

use Drupal\Core\Entity\ContentEntityInterface;
use Drupal\Core\Entity\EntityChangedInterface;
use Drupal\user\EntityOwnerInterface;

/**
 * Provides an interface defining a Social entity.
 */
interface SocialInterface extends ContentEntityInterface, EntityChangedInterface, EntityOwnerInterface {

  /**
   * Gets the Social creation timestamp.
   *
   * @return int
   *   Creation timestamp of the Social.
   */
  public function getCreatedTime();

  /**
   * Sets the Social creation timestamp.
   *
   * @param int $timestamp
   *   The Social creation timestamp.
   *
   * @return \Drupal\custom_entities\Entity\SocialInterface
   *   The called Social entity.
   */
  public function setCreatedTime($timestamp);

  /**
   * Returns the Social published status indicator.
   *
   * Unpublished Socials are only visible to restricted users.
   *
   * @return bool
   *   TRUE if the Social is published.
   */
  public function isPublished();

  /**
   * Sets the published status of a Social.
   *
   * @param bool $published
   *   TRUE to set this Social to published, FALSE to set it to unpublished.
   *
   * @return \Drupal\custom_entities\Entity\SocialInterface
   *   The called Social entity.
   */
  public function setPublished($published);

}
